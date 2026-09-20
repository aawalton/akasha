import { APP_AUDIENCE } from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import { contributorInCode } from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import type { BetterAuthPlugin, User } from "better-auth"
import { createAuthEndpoint } from "better-auth/api"
import { setSessionCookie } from "better-auth/cookies"
import { z } from "zod"

export const APP_HANDOVER_PLUGIN = "app-handover"

const USER_MODEL = "user"

const CONTRIBUTOR_FIELD = "contributor"

export const appHandoverBody = z
  .object({ code: z.string().min(1), verifier: z.string().min(1) })
  .strict()

export type AppHandoverTrade = {
  readonly contributor: string | null
}

const NOBODY: AppHandoverTrade = { contributor: null }

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
          const user = await ctx.context.adapter.findOne<User>({
            model: USER_MODEL,
            where: [{ field: CONTRIBUTOR_FIELD, value: contributor }],
          })
          if (user === null) return NOBODY
          const session = await ctx.context.internalAdapter.createSession(user.id)
          await setSessionCookie(ctx, { session, user })
          return { contributor }
        }
      ),
    },
  } satisfies BetterAuthPlugin
}
