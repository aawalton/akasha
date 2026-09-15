import type { formFactor } from "akasha/infrastructure/machine/computer/properties/form-factor.select-property.ts"

export type FormFactor = (typeof formFactor.values)[number]
