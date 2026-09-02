export function header(this: void, text: string): LamHeaderData {
  return { type: "header", name: ZO_HIGHLIGHT_TEXT.Colorize(text) }
}
