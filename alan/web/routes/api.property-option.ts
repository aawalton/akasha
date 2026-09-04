import { getUser } from "@akasha/supabase-rr/auth-server"
import { z } from "zod"
import { unheld } from "../pages-unheld/pages-unheld.module.code.ts"

const PROPERTY_DEFINITION_PAGE_TYPE = "page-property-definition"

const BodySchema = z
  .object({
    definitionId: z.string().uuid(),
    label: z.string(),
  })
  .strict()

// THIS ROUTE ALREADY REFUSED EVERY OPTION IT WAS ASKED TO ADD; NOW IT REFUSES THE READ AS WELL.
// A property definition is a file in the akasha repository and its option set is that file's
// `values:` key, so there was never a row to write — the route answered 501 and said so. The one
// thing it could still do was read the definition to tell a caller their label was already an
// option there. That read went to `@shared/pages-query`, and
// `page-property-definition` is no page type the pages system service holds, so it cannot be
// made either.
//
// The 404 the unread definition used to fall through to is not reused: it would tell a caller
// their property does not exist when what happened is that no property was read.
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
  const { definitionId } = parsed.data

  return Response.json(
    {
      ok: false,
      error:
        "Adding a select option is not available. A property definition is a file in the akasha repository, and its option set is that file's `values:` key — there is no row to write and no `config.options` to write to. Declare the option in the definition file through akasha's gated write path. " +
        unheld(PROPERTY_DEFINITION_PAGE_TYPE, `the definition \`${definitionId}\``),
      created: false,
    },
    { status: 501, headers }
  )
}
