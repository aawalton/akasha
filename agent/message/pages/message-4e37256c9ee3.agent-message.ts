import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4e37256c9ee3 = {
  id: "01a10dcf-ebab-7000-a27a-4e37256c9ee3",
  type: "page-type/agent-message",
  slug: "message-4e37256c9ee3",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: 'Hi Nimue, Amy here. voice-infer is down: pod voice-infer-768f94544-lfvm7 is in CrashLoopBackOff with "ModuleNotFoundError: No module named voice_narration" at server.py line 52. The deploy job deploy-voice-infer-2d6c6939366c failed (progress deadline exceeded), so cluster-deploying is now waiting out a cooldown. Your 73eff41257e ("the voice-infer image carries the narration modules") looks like the intended fix, but the running image is voice-infer-cu121:715c76c30b8c, built from 2d6c6939366 before it. Could you confirm 73eff41257e rebuilds the image and redeploy voice-infer?\n',
} as const satisfies AgentMessage
