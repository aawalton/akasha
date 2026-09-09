import { unwritten } from "../../pages-unheld/pages-unheld.module.code.ts"

const MESSAGE_PAGE_TYPE_SLUG = "message"

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }
  return Response.json(
    { error: unwritten(MESSAGE_PAGE_TYPE_SLUG, "an inbound text") },
    { status: 503 }
  )
}
