---
id: 22487ad6-4a35-56a5-9da1-b0836509341e
page-type-slug: finding
title: "Delegate cannot read"
domain-slug: domain/global
---

# Claim

A delegate whose shell captures stdout cannot use `ops instructions read` at all, because the verb refuses a pipe. So the seats that most need the governing set handed to them are the ones structurally unable to ask for it, and they proceed on whatever their boot context happened to carry.

# Evidence

`tools/read.ts` refuses when its output is going to a pipe or `/dev/null`, and the reasoning it prints is sound: "WHAT THE RECORD SAYS IS THAT THE BODY REACHED YOU, so a read whose output is being thrown away is REFUSED ... it hands back a slice while a record would claim the whole file."

That reasoning holds for a seat whose tool results reach its model directly. It does not hold for a delegate that shells out and captures stdout, because there the pipe IS how the body reaches the reader. The gate cannot tell the two apart, so it refuses the case it was built to serve.

Observed twice, from one `review-check` seat, unprompted and in consecutive reviews. Its second report: "`ops instructions read` refuses when its output goes to a pipe, which is how my shell captures output. I read the governing set — `check.md`, `code-check.md`, `instrument.md`, `agent-harness.md`, `global.md`, `code-harness.md` — from my own boot context, which carried them whole. The five that `governs` named and I did not read are `code-quality.md`, `code.md`, `file-kinds/typescript.md`, `folders/code-repo.md`, `infra.md`."

The seat did the honest thing and named what it had not reached. Nothing required that of it, and nothing would have reported the omission — a review written without five governing documents reads exactly like one written with them.

The cost compounds with the read-before-write gate. A delegate that cannot read also cannot write, so any repair it finds has to travel back up as prose to a seat that can, which is the hand-off `domains/role.md` § Adjacent Repair exists to prevent.

The same seat's boot context did carry the six documents it names, so this is not blindness — it is an inability to refresh. A document changed after the delegate booted is one the delegate cannot learn about, while its record shows the stale body as read.
