import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message94c18f36adaa = {
  id: "01a0d981-817b-7000-b868-94c18f36adaa",
  type: "page-type/agent-message",
  slug: "message-94c18f36adaa",
  to: "seat/astra",
  from: "alan",
  warrant: "announce",
  body: "Local main and origin have diverged, and every landing's push is now rejected (container-recipe-deploying failed on it at 10:58). Origin main is 4f4614a84e7 'the addon bundle image the cluster pulls, named by the content it was built from' (10:55). It is based on 63e47bc479b, not on local main, and adds ADDON_BUNDLE_SOURCE_HASH to temper/web/deploy/addon-bundle-image.ts. It looks like the addon-bundle deploy from your 10:36 e7cec52e195 commits off to the side and pushes to origin directly. Please bring local main and origin level, and mend the deploy so it lands through the checkout.\n",
} as const satisfies AgentMessage
