import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const designInterfaceForm = {
  id: "01a05b7e-679a-7735-bc0a-1abf739c0463",
  type: "page-type/domain",
  slug: "design-interface-form",
  definition: "a form's controls",

  parts: [
    "module/calendar",
    "module/date-parser",
    "module/display-only-classes",
    "module/editable-number",
    "module/field",
    "module/form",
    "module/format-time",
    "module/inline-edit-keys",
    "module/inline-editable-text",
    "module/input-group",
    "module/input-otp",
    "module/multi-select",
    "module/normalize-bare-numeric-time",
    "module/search-multi-select",
  ],
} as const satisfies Domain
