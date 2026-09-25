import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1672d35142a3 = {
  id: "01a0d904-63bb-7000-9643-1672d35142a3",
  type: "page-type/agent-message",
  slug: "message-1672d35142a3",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "orphaned-resources-sweep failed at 08:42 (it reports to dalla, whom no seat holds). Its finding: 4 'orphans' in namespace alanwalton, Deployment+Service atlas and web, managed-by=deploy-script. These are live and serving alanwalton.com and atlas (web on alanwalton-web:2151555, 113d), so they must not be swept. The fault is that no source manifest in the checkout names them (35 keys read), since the alanwalton-web and atlas deploys apply without a tracked manifest. Either give those deploys manifests the sweep reads, or teach the sweep that managed-by=deploy-script is owned. I have not touched the cluster.\n",
} as const satisfies AgentMessage
