---
id: 57deba63-0299-5b12-94d3-13db5404f167
slug: ops-instructions
page-type-slug: review-instructions-report
title: "Ops instructions"
---

# Lines

1. **Design — "A command that writes commits and pushes in the same call."**
   - Keep. True as run. `tools/lib/command.ts` lands every write through `whileHoldingLanding(root, () => ({ commit: commitPaths(root, paths, message), push: pushBranch(root) }))`, and `pushBranch` in `tools/lib/git.ts` runs `git push <remote> HEAD:refs/heads/<branch>` before the command returns. That one landing path is what `write`, `edit`, `replace`, `mv` and `rm` all reach, so the claim holds over every command here that writes.
   - The push half is bound nowhere else. `git commit --allow-empty` inside this root was refused by the hook, and the refusal names "validate, then write, then commit the paths they wrote" — it never says the commit is pushed. `bun tools/write.ts --help` says "nothing unvalidated becomes DURABLE" and names no remote either. Searching `domains/` and `page-types/` for the claim returns this line alone.
   - What it stops is not a wasted `git push`. The write is on the remote before the command answers, so an agent that means to look at what it landed and reset it locally is working against a copy it can no longer take back. `page-types/role.md` asks it to look at what an irreversible act lands on first, and this is the only line that says the act is one.

2. **Design — "The file a command runs is the file `ops memory` runs where that file declares the memory repository too, and `ops instructions` supplies no `--repo` flag."**
   - Cut. Both halves are true, and both are stated by the help of the commands they describe. `ops memory read --help` opens "An `ops` command forwarding to `tools/read.ts` in the instructions repository. It supplies `tools/read.ts --repo memory`" — the whole first half. `ops instructions read --help` names the same file and says "Every argument is forwarded verbatim, nothing is parsed or rewritten on the way through" — the second half.
   - The first half is bound a second time by `domains/ops-memory.md`, whose Design says "Every command but `project-tree` is one file serving several repositories, reached here because the dispatcher supplies `--repo memory`". That is the richer of the two, naming the one exception, and it sits where the surprise is. `domains/global.md` asks each claim to be bound from one document, and this is the copy.
   - The second half guards nothing a caller can get wrong, `--repo instructions` being the tool's own default. Under `--dry-run`, `ops instructions write --repo memory` gated against the memory repo, and so did `ops memory write --repo instructions`, the injected flag beating the typed one. Neither costs anything. What is left is a fact about `repoArgs` in `tools/ops/tool-forward.ts`, a one-line ternary anyone editing it reads.

3. **Design — "A command here is a file directly under `tools/`, rather than under `tools/commands/`."**
   - Keep. True as run. `declaringTools` in `tools/ops/forwarders.ts` reads `${root}/tools` with a single `readdirSync` and keeps only entries where `one.isFile()`, so nothing in a subdirectory is ever seen. The 36 files directly under `tools/` carrying `export const tool = {` are exactly the 35 `ops instructions` commands plus `project-tree`, which declares `memory` alone.
   - The pull the other way is 546 command files under `tools/commands/`, where every other namespace puts its own; there is no `tools/commands/instructions/` or `tools/commands/memory/` at all. A command placed there is refused by nothing and raises nothing — it simply never appears in `ops instructions`, and the agent that wrote it has no reason to look. That silence is what makes the line worth its place.
   - The trailing clause stays. Stripped of it the sentence is still exact, but it no longer names the guess it exists to head off, and reads as trivia about where a file sits rather than as a departure from what 546 sibling commands do.

4. **`# Design` and the section beneath it**
   - Keep. `page-body-shapes/domain.md` gives `design` a count of 0-1 and a `{design}` slot rather than a bare heading, so the section stands exactly while something stands beneath it, and two entries stand — the file location at line 3 and the commit-and-push at line 1, both kept. `ops instructions run-gates domains/ops-instructions.md` passes `page-holds-shape` at 16 parts against the shape `domain` states, with the section as it now is.
   - Both entries are departures in the sense `domains/domain-design.md` allows: a decision a reader would not guess right, where knowing it stops them undoing it. Neither is an instruction to a seat and neither carries a reason for itself, which is what that document asks of the section.

5. **Definition — "Ops instructions — the commands that read and write the instructions repository and run the harness it holds."**
   - Keep. It reaches all 35 commands `ops instructions` prints. Twenty-two read or write this repository: `read`, `write`, `edit`, `replace`, `mv`, `rm`, the four `page-*`, the two `rename-*`, the two finding commands, `governs`, `holds`, `corpus`, `dag`, `glossary`, `owns`, `unreached`, `reaches`. Thirteen run the harness: `compose-boot`, `compose-subagents`, `seat`, `seat-name`, `sweep-seats`, the four `turn-end-*`, `run-checks`, `run-gates`, `run-tests` and `playwright-storage-state`.
   - It holds the shape `domains/domain-definition.md` asks for: one bullet, no clause saying what the domain is for or where it sits, and one concern — the commands of one namespace — rather than two areas bolted together. At 89 characters it sits under the 100 the `body` slot takes at `sm` on the ladder in `tools/document/tokens.ts`, and `page-holds-shape` passes at 16 parts.
   - `playwright-storage-state` falls inside the second half: it writes the state the Playwright MCP boots with, and that MCP is declared in this repository's own `tools/lib/mcp-registry.ts`, so preparing it is running the harness this repo holds. The Definition takes the command in. The glob at line 7 leaves it out, and that is where it is repaired.

6. **`# Definition` and the section beneath it**
   - Keep. `page-body-shapes/domain.md` gives `definition` a repeat of 1, so it is the one part of a domain body that cannot be left out, and `page-holds-shape` refuses a file without it. Beneath it stands exactly one bullet, which is all `domains/domain-definition.md` allows.

7. **Frontmatter**
   - Repair, with `reviewed-date` stamped at the end. `instructions-path:` named 34 files and `ops instructions` prints 35 commands. The one left out is `playwright-storage-state`, and `ops instructions governs --file-path tools/playwright-storage-state.ts` named `agent-harness`, `instructions-harness`, `instructions-repo`, `global` and the code documents — no `ops-*` document at all, so a command in this namespace stood outside the domain that is its namespace.
   - `page-types/domain.md` takes a glob only where the domain's area is that set of files. The area is this namespace, `domains/ops-namespace.md` holding that every namespace is a domain, and the Definition at line 5 reaches all 35. So the set was one name short rather than the glob being wrong to exist. `playwright-storage-state` went in between `page-secret` and `reaches`, and `governs` now names this document for it and for each of the other 34.
   - Left standing: `run-checks, run-tests, run-gates` sit out of alphabetical order inside the brace, which a brace expansion does not care about and no reader acts on. The other five keys hold — `relations-resolve` passes 5 of 5 over `ops-cli`, `ops-namespace`, `instructions-repo` and the owner, `domain-slug-stem` and `domain-slug-unique` pass over 2515 domains, and `page-holds-properties` at 7 keys against the 33 `domain` declares.
