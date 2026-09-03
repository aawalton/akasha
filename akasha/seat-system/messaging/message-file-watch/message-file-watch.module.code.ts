import { mkdirSync, watch } from "node:fs"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import {
  type Message,
  messageDirRelPath,
  recipientRefused,
  unclaimedTo,
} from "@tools/lib/message-file"

const BACKSTOP_MS = 5_000

const SETTLE_MS = 50

export interface Watch {
  readonly stop: () => void
}

export function watchMessagesTo(
  to: string,
  onMessage: (message: Message) => unknown,
  opts: { readonly backstopMs?: number; readonly onError?: (err: unknown) => void } = {}
): Watch {
  const refused = recipientRefused(to)
  if (refused !== null) throw new Error(refused)
  const onError = opts.onError ?? ((err) => console.error("[messages] watch:", err))
  const dir = `${akashaRoot()}/${messageDirRelPath(to)}`
  try {
    mkdirSync(dir, { recursive: true })
  } catch (err) {
    onError(err)
  }

  const offered = new Set<string>()
  let sweeping = false
  let again = false

  const sweep = async (): Promise<void> => {
    if (sweeping) {
      again = true
      return
    }
    sweeping = true
    try {
      do {
        again = false
        for (const message of unclaimedTo(to)) {
          if (offered.has(message.id)) continue
          offered.add(message.id)
          try {
            await onMessage(message)
          } catch (err) {
            offered.delete(message.id)
            onError(err)
          }
        }
      } while (again)
    } finally {
      sweeping = false
    }
  }

  const wake = (): void => {
    setTimeout(() => void sweep(), SETTLE_MS)
  }

  let watcher: ReturnType<typeof watch> | null = null
  try {
    watcher = watch(dir, () => wake())
  } catch (err) {
    onError(err)
  }

  const backstop = setInterval(() => void sweep(), opts.backstopMs ?? BACKSTOP_MS)
  void sweep()

  return {
    stop: (): void => {
      clearInterval(backstop)
      watcher?.close()
    },
  }
}
