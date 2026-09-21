import type { selectOptionSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import type * as z from "zod"

export type SelectOption = z.infer<typeof selectOptionSchema>
