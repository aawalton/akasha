// The work panel. A row's color is already raised from the rows beneath it, so the editor draws
// the color it is given rather than working one out.
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
