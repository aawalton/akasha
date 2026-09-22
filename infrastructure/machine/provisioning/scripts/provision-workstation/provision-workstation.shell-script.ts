import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const provisionWorkstation = {
  id: "01a06864-40db-75c0-8e65-54f538b8d39b",
  type: "page-type/shell-script",
  slug: "provision-workstation",
  definition: "the Linux workstation brought to the state in which agents work on it",
  shell: "sh",
  sourced: false,
  scripting: {},
} as const satisfies ShellScript
