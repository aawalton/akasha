import type { OAuthCredential } from "akasha/agents/models/gateway/modules/oauth-types/oauth-types.module.code.ts"
import type { PeekedResponse } from "akasha/agents/models/gateway/modules/peek-response/peek-response.module.code.ts"

export type RebindOutcome =
  | { kind: "response"; response: Response }
  | { kind: "rebind"; account: string; cred: OAuthCredential }

export function answeredFrom(peeked: PeekedResponse): RebindOutcome {
  return { kind: "response", response: peeked.rebuild() }
}
