import { unwritten } from "../pages-unheld/pages-unheld.module.code.ts"
import type { Route } from "./+types/api.sms.webhook"

const MESSAGE_PAGE_TYPE_SLUG = "message"

// AN INBOUND SMS HAS NOWHERE TO LAND. Everything this route did — verify Telnyx's signature, read
// the allowlist, record a discard — was in service of one act at the end: writing a `message`
// page to the seat the text was for. That write went through `@shared/pages-query`, which wrote
// into this pod's own checkout. The reach is severed, and `message` is no page type the pages
// system service holds, so there is no seat to deliver to.
//
// 503 RATHER THAN 200. Verifying the signature and then dropping the text would hand Telnyx a
// delivered receipt for a message nobody will ever read; the sender would be told it arrived. A
// 503 is a message this app declines to take, which Telnyx retries and then reports as
// undelivered — the true state, said to the one person it matters to.
export async function action({ request }: Route.ActionArgs): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }
  return Response.json(
    { error: unwritten(MESSAGE_PAGE_TYPE_SLUG, "an inbound text") },
    { status: 503 }
  )
}
