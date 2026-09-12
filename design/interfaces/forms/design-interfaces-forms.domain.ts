import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const designInterfacesForms = {
  id: "01a05b7e-679a-7735-bc0a-1abf739c0463",
  type: "domain",
  slug: "design-interfaces-forms",
  definition: "the controls a form is built from",

  parts: [
    "module/calendar",
    "module/date-parser",
    "module/display-only-classes",
    "module/editable-number",
    "module/field",
    "module/form",
    "module/format-time",
    "module/inline-edit-keys",
    "module/inline-editable-number",
    "module/inline-editable-text",
    "module/input-group",
    "module/input-otp",
    "module/multi-select",
    "module/normalize-bare-numeric-time",
    "module/search-multi-select",
  ],
} as const satisfies Domain
