import type { Given } from "../../modules/calling/calling.module.code.ts"

export function given(root: string): Given {
  return { root, calledAs: "akasha deploy", from: root, writer: null, agentId: null }
}
