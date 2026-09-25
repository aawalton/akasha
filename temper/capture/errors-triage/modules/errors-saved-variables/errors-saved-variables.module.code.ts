import type { ErrorsPayload } from "akasha/temper/capture/error/modules/errors-payload/errors-payload.module.code.ts"
import { savedVariablesRootSchema as captureRootSchema } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const errorEntrySchema = z
  .object({
    traceback: z.string().nullish(),
    message: z.string(),
    count: z.number(),
    firstSeenAt: z.number(),
    lastSeenAt: z.number(),
    account: z.string(),
    character: z.string(),
    world: z.string(),
    esoVersion: z.string(),
    apiVersion: z.number(),
    eventCode: z.number(),
    errorCode: z.number().optional(),
    attributedAddon: z.string().optional(),
    attributedBuildId: z.string().optional(),
    buildIds: z.record(z.string(), z.string()).optional(),
  })
  .strict()

const accountWideSchema = z
  .object({
    version: z.number().optional(),
    entries: luaArrayOrEmpty(errorEntrySchema).optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof accountWideSchema, ErrorsPayload>()

export const rootSchema = captureRootSchema(accountWideSchema)
