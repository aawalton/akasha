interface HookPayload {
  ref: string
  before: string
  after: string
  repo_path: string
}

const NULL_SHA = "0000000000000000000000000000000000000000"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isHookPayload(value: unknown): value is HookPayload {
  return (
    isRecord(value) &&
    typeof value.ref === "string" &&
    typeof value.before === "string" &&
    typeof value.after === "string" &&
    typeof value.repo_path === "string"
  )
}

export async function handlePushEvent(req: Request): Promise<Response> {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!isHookPayload(raw)) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }
  const hook = raw

  if (!hook.ref.startsWith("refs/heads/")) {
    return Response.json({ accepted: false, filtered: true }, { status: 200 })
  }

  if (hook.after === NULL_SHA) {
    console.log(`[git-transport] Ignoring branch deletion event for ${hook.ref}`)
    return Response.json({ accepted: false, filtered: true }, { status: 200 })
  }

  const branch = hook.ref.replace("refs/heads/", "")
  console.log(`[git-transport] Push to ${branch}: ${hook.after.slice(0, 7)}`)

  return Response.json({ accepted: true }, { status: 200 })
}
