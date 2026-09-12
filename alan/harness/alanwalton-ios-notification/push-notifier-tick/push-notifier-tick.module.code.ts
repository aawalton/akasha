import type {
  ApnsPayload,
  ApnsSender,
} from "akasha/alan/harness/alanwalton-ios-notification/modules/apns-sending/apns-sending.module.code.ts"
import {
  listDeviceTokens,
  pruneDeviceToken,
} from "akasha/alan/harness/alanwalton-ios-notification/push-device-tokens/push-device-tokens.module.code.ts"
import {
  buildApnsPayload,
  buildSharedApnsPayload,
  notificationFeedRoute,
  type Recipient,
  recipientsFor,
} from "akasha/alan/harness/alanwalton-ios-notification/push-payload/push-payload.module.code.ts"
import {
  type Notification,
  newestNotificationAt,
  readNotificationsAfter,
} from "akasha/alan/harness/notification-feeds/rows/notification-feed-rows.module.code.ts"
import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"

export const WORKER_NAME = "apns-push-notifier"

export const LOG = `${WORKER_NAME}:`

export const TICK_MS = 15_000

export const TICK_CEILING_MS = 120_000

export interface NotifierState {
  sentThrough: string
}

function say(line: string): undefined {
  console.log(`${LOG} ${line}`)
  return undefined
}

function complain(line: string, err: unknown): undefined {
  console.error(`${LOG} ${line}`, err)
  return undefined
}

export async function openState(): Promise<NotifierState> {
  const newest = await newestNotificationAt()
  return { sentThrough: newest ?? new Date().toISOString() }
}

function deliveredSaid(what: string, bundleId: string): string {
  return `${what}, delivered to a phone on ${bundleId}, which nothing here takes back`
}

function prunedSaid(bundleId: string): string {
  return `a dead device token on ${bundleId}, taken away`
}

async function fanOut(
  args: {
    readonly sender: ApnsSender
    readonly recipients: readonly Recipient[]
    readonly payloadFor: (recipient: Recipient) => ApnsPayload
    readonly what: string
    readonly signal: AbortSignal
  },
  done: string[] = []
): Promise<void> {
  for (const recipient of args.recipients) {
    args.signal.throwIfAborted()
    const tokens = await listDeviceTokens(recipient.userId)
    if (tokens.length === 0) {
      say(`${args.what}: ${recipient.userId} has no device registered; nothing to push`)
      continue
    }
    const payload = args.payloadFor(recipient)
    for (const token of tokens) {
      args.signal.throwIfAborted()
      try {
        const said = await args.sender.send(token.deviceToken, payload, token.bundleId)
        if (said.kind === "prune") {
          await pruneDeviceToken(token.deviceToken)
          done.push(prunedSaid(token.bundleId))
          say(
            `${args.what}: dropped a dead token on ${token.bundleId} (${said.status} ${said.reason})`
          )
        } else if (said.kind === "error") {
          complain(`${args.what}: ${token.bundleId} refused it (${said.status})`, said.reason)
        } else {
          done.push(deliveredSaid(args.what, token.bundleId))
          say(`${args.what}: delivered on ${token.bundleId} (${said.apnsId ?? "no id"})`)
        }
      } catch (err) {
        complain(`${args.what}: the send to ${token.bundleId} threw:`, err)
      }
    }
  }
}

async function pushNotification(
  args: {
    readonly notification: Notification
    readonly sender: ApnsSender
    readonly alanUserId: string
    readonly signal: AbortSignal
  },
  done: string[] = []
): Promise<void> {
  const one = args.notification
  const what = `notification ${one.id}`
  const route = notificationFeedRoute(one.feed)
  await fanOut(
    {
      sender: args.sender,
      recipients: recipientsFor({ ownerUserId: args.alanUserId, kind: one.kind }),
      payloadFor: (recipient) =>
        recipient.ownsNotification
          ? buildApnsPayload({ title: one.title, body: one.body, route })
          : buildSharedApnsPayload({ title: one.title, body: one.body }),
      what,
      signal: args.signal,
    },
    done
  )
}

export interface TickDeps {
  readonly sender: ApnsSender | null
  readonly writer: string
  readonly alanUserId?: string
}

async function runPushNotifierTick(
  state: NotifierState,
  deps: TickDeps,
  signal: AbortSignal,
  done: string[] = []
): Promise<void> {
  const alanUserId = deps.alanUserId ?? USER_ID

  const waiting = await readNotificationsAfter(state.sentThrough)
  const fresh = waiting.filter((one) => one.sentAt > state.sentThrough)
  const sender = deps.sender
  if (sender === null) {
    if (fresh.length > 0) {
      say(`${fresh.length} notification(s) went unpushed: APNs is unprovisioned here`)
    }
    for (const one of fresh) state.sentThrough = one.sentAt
    return
  }
  for (const one of fresh) {
    signal.throwIfAborted()
    try {
      await pushNotification({ notification: one, sender, alanUserId, signal }, done)
    } catch (err) {
      complain(`notification ${one.id}: the push leg threw:`, err)
    }
    state.sentThrough = one.sentAt
  }
}

export async function runBoundedPushNotifierTick(
  state: NotifierState,
  deps: TickDeps,
  signal: AbortSignal,
  done: string[] = []
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${LOG} a tick has not answered inside ${TICK_CEILING_MS}ms while pushing; ending ` +
              "rather than starting a second tick beside it"
          )
        ),
      TICK_CEILING_MS
    )
  })
  try {
    await Promise.race([runPushNotifierTick(state, deps, signal, done), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
