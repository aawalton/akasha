import { registerDeviceToken } from "@akasha/person-system/device-token"
import { SMILINGJENNY_PUSH_APP } from "@akasha/person-system/push-apps"
import { z } from "zod"
import { requireApiJenny } from "../.server/jenny-session/jenny-session.module.code.ts"
import type { Route } from "./+types/api.push.register"

const RegisterBody = z.object({
  deviceToken: z.string().min(1).max(512),
  platform: z.literal("ios"),
})

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  await requireApiJenny(request)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }
  const parsed = RegisterBody.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid device token registration." },
      { status: 400 }
    )
  }

  await registerDeviceToken({
    userId: SMILINGJENNY_PUSH_APP.userId,
    deviceTokenRegistration: parsed.data.deviceToken,
    platform: parsed.data.platform,
    bundleId: SMILINGJENNY_PUSH_APP.bundleId,
  })
  return Response.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } })
}
