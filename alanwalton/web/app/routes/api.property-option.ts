import { MAX_OPTION_LABEL_LENGTH, resolveSelectOptionCreate } from "@shared/pages-core/schema/select-option-create"
import { multiSelectConfigSchema } from "@shared/pages-core/schema/property-config-schemas"
import { askComposed } from "@shared/pages-query/ask"
import { getUser } from "@shared/supabase-rr/auth/server"
import { z } from "zod"

const PROPERTY_DEFINITION_PAGE_TYPE = "page-property-definition"

const BodySchema = z
  .object({
    definitionId: z.string().uuid(),
    label: z.string(),
  })
  .strict()

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value)
}

export async function action({ request }: { request: Request }): Promise<Response> {
  const { user, headers } = await getUser(request)
  if (!user) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401, headers })
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400, headers })
  }
  const parsed = BodySchema.safeParse(rawBody)
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400, headers })
  }
  const { definitionId, label } = parsed.data

  const asked = await askComposed({
    "page-type": PROPERTY_DEFINITION_PAGE_TYPE,
    where: { id: { is: definitionId } },
    limit: 1,
  })
  if (!asked.ok) {
    return Response.json({ ok: false, error: "Property not found." }, { status: 404, headers })
  }
  const def = asked.answer.rows[0]?.values
  if (def === undefined || def["page-type-slug"] !== PROPERTY_DEFINITION_PAGE_TYPE) {
    return Response.json({ ok: false, error: "Property not found." }, { status: 404, headers })
  }
  if (def.type !== "multi-select") {
    return Response.json(
      { ok: false, error: "Options can only be added to multi-select properties." },
      { status: 400, headers }
    )
  }
  const rawConfig: Record<string, unknown> = isPlainObject(def.config) ? def.config : {}
  const { options } = multiSelectConfigSchema.parse(rawConfig)
  const decision = resolveSelectOptionCreate({
    label,
    existingOptions: options,
    maxLabelLength: MAX_OPTION_LABEL_LENGTH,
  })
  if (decision.kind === "invalid") {
    return Response.json({ ok: false, error: decision.reason }, { status: 400, headers })
  }
  if (decision.kind === "existing") {
    return Response.json({ ok: true, option: decision.option, created: false }, { headers })
  }

  return Response.json(
    {
      ok: false,
      error:
        "Adding a select option is not available. A property definition is a file in the instructions repo, and its option set is that file's `values:` key — there is no row to write and no `config.options` to write to. Declare the option in the definition file through the instructions repo's gated write path.",
      option: decision.option,
      created: false,
    },
    { status: 501, headers }
  )
}
