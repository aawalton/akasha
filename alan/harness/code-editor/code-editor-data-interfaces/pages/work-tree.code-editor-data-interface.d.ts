// The work panel. A row draws the color it is given and works none out. A row is given the color
// of the seat sitting on it, or no color, and takes nothing from the rows beneath it.
//
// A row is an initiative or one of the intents that initiative holds. The two are told apart by
// `kind` rather than by whether a row has children, because an initiative holding no intent and
// leading nowhere has none either.

declare type WorkTreeRow = TreeRow & {
  readonly kind: "initiative" | "intent"
  readonly detail: string | null
  readonly note: string | null
  readonly children: readonly WorkTreeRow[]
}

declare type WorkTreeState = {
  readonly roots: readonly WorkTreeRow[]
}
