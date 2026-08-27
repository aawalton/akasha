---
id: b7066e89-ddc9-5405-9be2-c69720497750
slug: unclassified-extensions-stand-outside
page-type-slug: finding
title: "Unclassified extensions stand outside"
domain-slug: domain/file-length
---

# Claim

The ceiling reaches only the extensions somebody classified as authored, so 62 text files stand over 15,000 characters outside every category Alan approved. For 37 of them nothing in the code's vocabulary calls them anything at all; the other 25 it calls serialized, which is a decision somebody made rather than a silence. The two want different work.

# Evidence

Read the code repository at `202763ce9` today. `classifyExtension` in `packages/shared/graph/producers/src/file/file-kind.ts` recognises 21 extensions, and `FILE_KIND_FACTS` beside it calls twelve authored — ts, tsx, js, jsx, css, md, lua, sh, rust, swift, dockerfile, systemd-unit — and eight serialized: sql, fizz, yaml, yml, json, toml, txt, lock. `fileLengthCap` returns null down two paths, once where `classifyExtension` returns null and once where the kind is classified but not authored, and nothing downstream tells them apart.

Counting every tracked file over 15,000 characters, the 62 split the same two ways. Unclassified, so never measured and never judged: 25 `.html`, 8 `.xml`, 3 `.py`, 1 `.tsv`. Classified as serialized, so measured against nothing on purpose: 10 `.json`, 5 `.yaml`, 5 `.sql`, 4 `.fizz`, 1 `.txt`.

The split changes the work. For the unclassified 37 the question is whether the extension is authored, and adding one is a `FileKind` — a graph node type with producers behind it. For the serialized 25 the extension is already a `FileKind`, so the question is only whether `authorship` was set right, and it probably was: a ceiling written for prose has little to say about a migration or a lockfile.

The 37 do not read alike. The 8 `.xml` are ESO addon UI markup under `metadata/`, hand-authored by any ordinary reading and the strongest case here. The 3 `.py` — `voice-infer/src/server.py` at 22,388 characters, `ai-toolkit/bin/lora-factory.py` at 21,223, `audio_measurement/engines/praat.py` at 15,997 — are plainly hand-written. The 25 `.html` and the 1 `.tsv` are captured pages and a recorded baseline under `test-data/` and `fixtures/`, data rather than prose. Two sit under a directory spelled `fixtures` rather than `__fixtures__`, so the approved exemption misses the thing it was written for.

Not measured: whether the `.html` fall outside under the machine-written test as `tools/code-comment/tree.ts` takes it.

Found while grounding #19315, whose eighty files are all in the twelve authored extensions.
