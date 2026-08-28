---
id: ee3ca22b-9fc2-5590-8f32-e4c70319f846
page-type-slug: finding
title: "ops write cannot make the file it must be given"
domain-slug: domain/page-writes-system
---

# Claim

`ops write` takes the body it lands from a file that must already exist. Creating that file is a write, and it cannot itself go through `ops write`. So an agent producing a body for a gated write breaks the one-write-path rule in the act of obeying it, every time, with no compliant option available.

# Evidence

`ops write --help` offers two ways to supply a body, and both name a path that must already be there. `--input-file <f>` takes "the tool-call JSON: `{ file_path, content }` or an array of them". `--content-file <f>` takes "the body for the --file-path before it". There is no flag carrying a body inline.

The destination is not the obstacle. `ops write` will write outside every repository — "A path inside no repository is written where it lies, with nothing committing it" — so a scratch body under `/var/tmp/` is a path it would accept. What it will not do is produce the body it is then handed.

`--patch-file` is the only flag that makes `ops write` emit a file rather than consume one, and what it emits is a patch: "Write the patch here and stop: nothing is checked, nothing is landed." A patch is not a body, so it cannot bootstrap the content file of a later call.

`CLAUDE.md` states the rule the gap runs against, under **One Write Path**: "Use `ops write` for every write", "A tool write and a shell redirect are both writes", and "Outside akasha is not an exception". Those three lines together leave no compliant way to create a content file.

Observed 2026-08-28 by seat astra. Every gated write the seat made across one night was preceded by a scratch body written with a plain file-writing tool under `/var/tmp/`, and the seat did not notice the conflict once. A delegate carrying the same constraint in its brief used a shell heredoc for the same purpose and disclosed it unprompted as a breach, which is how the conflict surfaced at all — by the person told the rule reporting themselves, rather than by the person giving it.

Not measured: whether any other command in the toolset writes an arbitrary body to an arbitrary path under the gates, and so could stand in the bootstrap step.

# Bearing

The rule is Alan's, so this page names the conflict rather than narrowing it. A reading that scopes the rule to paths inside a repository resolves it and is what the seat acted on for the night; that reading is the seat's own and is recorded here as an act taken, not as an approval given.
