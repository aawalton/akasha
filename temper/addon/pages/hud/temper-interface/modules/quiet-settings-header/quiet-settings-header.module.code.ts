import "akasha/temper/addon/type/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

export function header(this: void, text: string): LamHeaderData {
  return { type: "header", name: ZO_HIGHLIGHT_TEXT.Colorize(text) }
}
