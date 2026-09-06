import type { Question } from "../question.page-type.ts"

export const node03HungAfterTheRebootTalosctlSDefaultKexecBoot = {
  id: "019f9643-d5fc-7024-9e53-f17b540519c6",
  pageTypeSlug: "question",
  slug: "node-03-hung-after-the-reboot-talosctl-s-default-kexec-boot",
  ask: "node-03 hung after the reboot — talosctl's default kexec boot path didn't return, and these are bare-metal nodes with NO IPMI, so there's no remote recovery. It needs a physical power-cycle. Can you power-cycle the node-03 box (or via any smart-plug/remote power you have)? A cold boot recovers the node AND loads the uinput module (completes #15805).",
  askedBy: "aranya",
  askedIn: "019f8b5b-53e0-7a96-b52d-d119f6e5540e",
  status: "answered",
  offered: ["On it — power-cycling node-03 now", "I have remote power control — recovering it"],
  answer: "On it — power-cycling node-03 now",
  closedAt: "2026-07-24T22:56:06.630Z",
  context: "txt",
} as const satisfies Question
