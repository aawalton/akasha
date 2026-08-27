---
id: 84767108-9bba-59e9-a085-892aae359690
page-type-slug: finding
title: "Resume notice arms misplaced"
domain-slug: domain/global
---

# Claim

`tools/checks/resume-notices.ts` sorts `editor-revive` onto the arm for notices that arrive on a message row, and it does not arrive on one: the editor extension passes the text to `ops seat revive --prompt`, whose own help says the prompt rides argv where there is no row to lose. By the refusal body that arm prints, the key belongs on the other arm and should carry `[supervisor]` rather than be refused for carrying it.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/notice-on-row-stamped.md` on 2026-08-12, which traced each key to what delivers it and read the flag's help and the extension's call site rather than inferring either.

It did not repair the refusal's third sentence, which is true of `limit-resume-nudge` and false of `editor-revive`, because repairing it means first settling which arm the key belongs on — and that moves the check, the `notices/resume.md` preamble, and possibly the notice's own text.

Not measured: whether the arm was deliberate when written, and what the check would report if the key moved.
