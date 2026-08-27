---
id: 2862ee2a-6691-5d72-b10a-9e6afc6ce32e
page-type-slug: finding
title: "Machine input search recorded as empty"
domain-slug: domain/alan-attention
---

# Claim

The typing-minute recorder's header comment in `packages/agents/supervisor/src/typing-minutes.ts` rests its "this cannot count machines" argument on `sendText` appearing nowhere in the code repository, and `sendText` appears in it, at `packages/agents/vscode-extension/src/features/agent-tree/activate.ts:451`.

# Evidence

Found by the lead verifying #18468, by running the search the comment asserts the result of. One call site stands: `resumeInteractive` in the agent-tree feature does `vscode.window.createTerminal(...)` and then `terminal.sendText(\`cr ${seat.name}\`)`.

The conclusion the comment draws still holds, for a reason the comment does not give. Those bytes are delivered to a terminal created one statement earlier, so they reach a shell prompt and are consumed by the shell that then launches `cr`; no `pty-proxy` exists in that terminal yet to receive them. The call also fires only under Alan's own click, so a minute it did record would not be a false one.

What the false sentence costs is the next reader. A change that calls `sendText` into a terminal already running an interactive seat would put machine-written bytes on `process.stdin` of a live `pty-proxy`, where `typingMinutes.note` sits, and the reading would begin counting minutes Alan did not type in. The comment tells that reader the search has been done and came back empty, so the one check that would catch it is the check the comment retires.

The same sentence stands in the `# Notes` of project #18468, widened to "either repository", where the lead's verdict now records the correction.

Not measured: whether any `sendText` reaches a terminal hosting a live proxy today. The single call site does not, and no sweep was made for other programmatic writers into a running seat's terminal beyond `sendText` and `send-keys`, both of which were searched across `packages/`.
