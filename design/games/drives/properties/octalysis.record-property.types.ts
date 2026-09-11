import type { OctalysisDefinition } from "akasha/design/games/drives/properties/octalysis-definition.text-property.types.ts"
import type { OctalysisName } from "akasha/design/games/drives/properties/octalysis-name.text-property.types.ts"
import type { OctalysisNumber } from "akasha/design/games/drives/properties/octalysis-number.number-property.types.ts"

export type Octalysis = {
  number: OctalysisNumber
  name: OctalysisName
  definition: OctalysisDefinition
}
