import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

const [normR, normG, normB, normA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_NORMAL
)
export const DEFAULT_TEXT_COLOR = ZO_ColorDef.New(normR, normG, normB, normA)

const [hiR, hiG, hiB, hiA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_CONTEXT_HIGHLIGHT
)
export const DEFAULT_TEXT_HIGHLIGHT = ZO_ColorDef.New(hiR, hiG, hiB, hiA)
