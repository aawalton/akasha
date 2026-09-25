import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB37b8953f370 = {
  id: "01a0d996-1648-7000-9902-b37b8953f370",
  type: "page-type/agent-message",
  slug: "message-b37b8953f370",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "cluster-deploying fails at 11:21 on job deploy-alanwalton-atlas-adaff7cfc852 (ns workers): 'alanwalton-atlas.service-cluster.ts states its manifests at …manifests.yaml, which the deploy of the web app naming alanwalton-atlas applies, so that web app is what is put up'. The cluster-deploying sweep still picks up a cluster service whose manifests a web-app deploy owns (since your 31d76116f29 moved atlas to written manifests), so it fails every tick. It should skip or defer such services rather than refuse. temper-web will do the same after 53543288db0.\n",
} as const satisfies AgentMessage
