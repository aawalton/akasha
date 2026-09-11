import type { formFactor } from "akasha/infrastructure/machines/computers/properties/form-factor.select-property.ts"

export type FormFactor = (typeof formFactor.values)[number]
