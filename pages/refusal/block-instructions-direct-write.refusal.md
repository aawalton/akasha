---
id: 94683222-a194-52db-9ed8-d685cb224d33
page-type-slug: refusal
title: "Block instructions direct write"
holes:
  - path
  - repo
  - root
  - via
  - cost
  - aim
  - rel
---

# Refusal

Refusing write on {path} — it lands inside the {repo} root ({root}).{via}
{cost} — no schema conformance, no link resolution.
Content enters through that repo's own commands, which validate, then write, then commit what they wrote:
  - ops edit{aim}    change passages in a file already there
  - ops write{aim}   carry a whole body; the command that can create a file
Inside that root the path is `{rel}`, which is what either command takes.

ASK THE COMMAND FOR ITS FLAGS — `--help` on either prints them. They are deliberately not repeated here: this hook carried a copy, the commands moved, and the copy went on naming flags they do not take. That does not fail loudly — an unrecognised flag leaves the command reading its payload from stdin, waiting for input nobody is sending.

Reads are not gated.
