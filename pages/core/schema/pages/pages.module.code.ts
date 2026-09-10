import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"
import * as z from "zod"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { detailConfigSchema } from "../detail-config/detail-config.module.code.ts"
import { listingConfigSchema } from "../listing-config/listing-config.module.code.ts"
import { mediaConfigSchema } from "../media-config/media-config.module.code.ts"
import { sequenceConfigSchema } from "../sequence-config/sequence-config.module.code.ts"

export type ReadonlyJSONValue =
  | string
  | number
  | boolean
  | null
  | readonly ReadonlyJSONValue[]
  | { readonly [key: string]: ReadonlyJSONValue | undefined }

export function parseConfig<T>(schema: z.ZodType<T>, raw: unknown, fallback: T): T {
  const result = schema.safeParse(raw ?? {})
  return result.success ? result.data : fallback
}

function humanizeIdentifier(id: string): string {
  const spaced = id
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
  const words = spaced.split(/\s+/).filter((w) => w.length > 0)
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

const propertyDefinitionLikeSchema = z
  .custom<PropertyDefinition>((val): val is PropertyDefinition => {
    if (!isRecord(val)) return false
    if (typeof val.id !== "string") return false
    if (typeof val.type !== "string") return false
    return typeof val.title === "string"
  })
  .transform(
    (def): PropertyDefinition =>
      def.title === "" ? Object.assign({}, def, { title: humanizeIdentifier(def.id) }) : def
  )

export const pageTypeDataSchema = z
  .object({
    propertyDefinitions: z.array(propertyDefinitionLikeSchema).readonly(),
    sequence: sequenceConfigSchema.optional().catch(undefined),
    listingConfig: listingConfigSchema.optional().catch(undefined),
    detailConfig: detailConfigSchema.optional().catch(undefined),
    mediaConfig: mediaConfigSchema.optional().catch(undefined),
  })
  .passthrough()

export type PageTypeDataJSON = z.infer<typeof pageTypeDataSchema>

export function parsePageTypeData(raw: unknown): PageTypeDataJSON {
  const result = pageTypeDataSchema.safeParse(raw ?? {})
  return result.success ? result.data : { propertyDefinitions: [] }
}
