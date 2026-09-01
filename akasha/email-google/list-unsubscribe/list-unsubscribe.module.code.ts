import { OperationalError } from "@akasha/errors-core/exit-code"
import type { GmailClient } from "../gmail-client/gmail-client.module.code.ts"
import { sendMessage } from "../gmail-messages/gmail-messages.module.code.ts"

export interface ParsedUnsubscribe {
  readonly oneClickUrl: string | undefined
  readonly httpUrl: string | undefined
  readonly mailto: { readonly address: string; readonly subject: string | undefined } | undefined
}

const ANGLE_URI = /<([^>]+)>/g
const ONE_CLICK_TOKEN = "list-unsubscribe=one-click"

function extractUris(listUnsub: string): readonly string[] {
  const out: string[] = []
  for (const match of listUnsub.matchAll(ANGLE_URI)) {
    const uri = match[1]?.trim()
    if (uri !== undefined && uri.length > 0) out.push(uri)
  }
  return out
}

function parseMailto(uri: string): { address: string; subject: string | undefined } {
  const rest = uri.slice("mailto:".length)
  const q = rest.indexOf("?")
  if (q < 0) return { address: rest, subject: undefined }
  const address = rest.slice(0, q)
  const params = new URLSearchParams(rest.slice(q + 1))
  const subject = params.get("subject")
  return { address, subject: subject ?? undefined }
}

export function parseListUnsubscribe(
  listUnsub: string | undefined,
  listUnsubPost: string | undefined
): ParsedUnsubscribe {
  if (listUnsub === undefined) {
    return { oneClickUrl: undefined, httpUrl: undefined, mailto: undefined }
  }
  const uris = extractUris(listUnsub)
  const httpUrl = uris.find((u) => /^https:\/\//i.test(u))
  const mailtoUri = uris.find((u) => /^mailto:/i.test(u))
  const mailto = mailtoUri !== undefined ? parseMailto(mailtoUri) : undefined
  const oneClickEligible = listUnsubPost?.trim().toLowerCase().includes(ONE_CLICK_TOKEN) === true
  return {
    oneClickUrl: oneClickEligible ? httpUrl : undefined,
    httpUrl,
    mailto,
  }
}

export type UnsubscribeResult = {
  readonly method: "one-click" | "mailto" | "none"
  readonly detail: string
}

export async function executeUnsubscribe(
  client: GmailClient,
  parsed: ParsedUnsubscribe
): Promise<UnsubscribeResult> {
  if (parsed.oneClickUrl !== undefined) {
    const res = await fetch(parsed.oneClickUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "List-Unsubscribe=One-Click",
    })
    if (!res.ok) {
      throw new OperationalError(
        `one-click unsubscribe POST failed: ${res.status} ${res.statusText} (${parsed.oneClickUrl})`
      )
    }
    return { method: "one-click", detail: parsed.oneClickUrl }
  }
  if (parsed.mailto !== undefined) {
    await sendMessage(client, {
      to: [parsed.mailto.address],
      subject: parsed.mailto.subject ?? "unsubscribe",
      body: "unsubscribe",
    })
    return { method: "mailto", detail: parsed.mailto.address }
  }
  return { method: "none", detail: "no List-Unsubscribe header" }
}
