import { CONTRIBUTOR } from "akasha/alan/harness/better-auth-rr/modules/sign-in-naming/sign-in-naming.module.code.ts"
import { APP_AUDIENCE } from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import { contributorInCode } from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { BetterAuthPlugin, User } from "better-auth"
import { createAuthEndpoint } from "better-auth/api"
import { setSessionCookie } from "better-auth/cookies"
import { z } from "zod"

const APP_HANDOVER_PLUGIN = "app-handover"

const USER_MODEL = "user"

const CONTRIBUTOR_FIELD = "contributor"

const CONTRIBUTOR_KEYS: readonly string[] = ["slug"]

const NO_MAIL_REACHES = "handover.invalid"

export const appHandoverBody = z
  .object({ code: z.string().min(1), verifier: z.string().min(1) })
  .strict()

type AppHandoverTrade = {
  readonly contributor: string | null
}

type OpenedUser = { readonly contributor: string }

const NOBODY: AppHandoverTrade = { contributor: null }

function addressFor(contributor: string): string {
  return `${contributor}@${NO_MAIL_REACHES}`
}

async function contributorPageIsThere(contributor: string): Promise<boolean> {
  const asked = await askingFor({
    pageTypeSlug: CONTRIBUTOR,
    where: { slug: { is: contributor } },
    keys: CONTRIBUTOR_KEYS,
  })
  if ("refused" in asked) {
    console.error(`a contributor page would not be read: ${asked.refused}`)
    return false
  }
  return asked.rows[0] !== undefined
}

export function appHandoverPlugin() {
  return {
    id: APP_HANDOVER_PLUGIN,
    endpoints: {
      appHandoverExchange: createAuthEndpoint.serverOnly(
        { method: "POST", body: appHandoverBody },
        async (ctx): Promise<AppHandoverTrade> => {
          const contributor = await contributorInCode({
            code: ctx.body.code,
            audience: APP_AUDIENCE,
            verifier: ctx.body.verifier,
          })
          if (contributor === null) return NOBODY
          const held = await ctx.context.adapter.findOne<User>({
            model: USER_MODEL,
            where: [{ field: CONTRIBUTOR_FIELD, value: contributor }],
          })
          if (held === null && !(await contributorPageIsThere(contributor))) return NOBODY
          const user =
            held ??
            (await ctx.context.internalAdapter.createUser<OpenedUser>(
              {
                name: contributor,
                email: addressFor(contributor),
                emailVerified: true,
                contributor,
              },
              { method: APP_HANDOVER_PLUGIN }
            ))
          const session = await ctx.context.internalAdapter.createSession(user.id)
          await setSessionCookie(ctx, { session, user })
          return { contributor }
        }
      ),
    },
  } satisfies BetterAuthPlugin
}
