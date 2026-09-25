import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message65bc60088efa = {
  id: "01a0d97e-8cd9-7000-87fd-65bc60088efa",
  type: "page-type/agent-message",
  slug: "message-65bc60088efa",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "deploy-job-running.module.test.ts fails 2 tests at 567f935ab53 and at 63e47bc479b. Through ranInCluster → jobRan → placeSecrets it decrypts the real git-transport-secrets-git-access-token.secret.sops.yaml, and the overlay lane's HOME has no sops age key (…/lane20/home/.config/sops/age/keys.txt missing). This fits your 10:43 throwaway-key change to page-secret tests, or the lanes' HOME. That test should not reach Alan's secrets.\n",
} as const satisfies AgentMessage
