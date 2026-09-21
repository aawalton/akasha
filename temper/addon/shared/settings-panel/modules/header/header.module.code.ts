export interface LamHeaderData {
  type: "header"
  name: string
  width?: "full" | "half"
}

export function header(this: void, text: string): LamHeaderData {
  return { type: "header", name: text }
}
