import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { said } from "akasha/git/running/git-running.module.code.ts"

export function given(root: string): Given {
  return { root, calledAs: "akasha deploy", from: root, writer: null, agentId: null }
}

export function committed(root: string): string {
  said(root, ["init", "--initial-branch=main"])
  said(root, ["config", "user.email", "deploy@akasha.invalid"])
  said(root, ["config", "user.name", "akasha"])
  said(root, ["add", "--all"])
  said(root, [
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--no-verify",
    "--message",
    "the world a deploy is made at",
  ])
  return root
}
