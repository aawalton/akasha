import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const designForms = {
  id: "01a05b7e-679a-7735-bc0a-1abf739c0463",
  pageTypeSlug: "workspace-package",
  slug: "design-forms",
  definition: "the controls a form is built from",
  manifest: "json",
  partSlugs: [
    "module/calendar",
    "module/date-parser",
    "module/editable-number",
    "module/field",
    "module/form",
    "module/format-time",
    "module/inline-editable-number",
    "module/inline-editable-text",
    "module/input-group",
    "module/input-otp",
    "module/multi-select",
    "module/normalize-bare-numeric-time",
    "module/search-multi-select",
  ],
} as const satisfies WorkspacePackage
