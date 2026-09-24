export type Outcome =
  | { readonly kind: "unstated" }
  | { readonly kind: "unchanged" }
  | { readonly kind: "written" }
  | { readonly kind: "removed" }
  | { readonly kind: "refused"; readonly detail: string }
