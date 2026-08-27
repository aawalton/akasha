---
id: 7afcb081-ecb2-52c2-9106-0f59e59321d6
slug: executable-bit-unsettable
page-type-slug: finding
title: "Executable bit unsettable"
domain-slug: domain/global
---

# Claim

No file in this repository is tracked executable and no verb here can make one, so a `.sh` landed in `tools/` and registered by its bare path is executed by nothing and reports nothing — the registration succeeds, the file exists, and the surface it renders is simply blank.

# Evidence

Measured 2026-08-02 while moving `statusline.sh` into `tools/` under project #17460, the first `.sh` this repository has ever held.

`git ls-files -s` returns not one `100755` entry across the whole tree. `tools/write.ts` takes `{file_path, content}` and writes bytes — it has no mode argument, and neither does any other verb in `tools/`. The landed script is `100644` where the code-repository original was `100755`, and nothing reported the difference because nothing was asked.

The failure is not hypothetical. Against the landed file, after the deploy:

    $ sh -c "$HOME/instructions/tools/statusline.sh" < payload
    sh: /home/walton/instructions/tools/statusline.sh: Permission denied
    exit 126

A `statusLine` or hook `command` naming a bare path is executed by the shell exactly that way, and the client discards the error — the surface renders empty with nothing going red. `check-hook-wiring` asks whether the registered file exists, and it does; `hooks-registered.ts` asks whether a registration names a file in this tree, and it does. Both pass while the script never runs.

What makes it invisible rather than merely undiscovered: the eight existing registrations here cannot meet it. All are `$HOME/.bun/bin/bun $HOME/instructions/tools/hooks/<name>.ts` — an interpreter, then a script — so the mode bit has never mattered and no author has had occasion to learn it cannot be set. The convention that makes the class safe is universal and written down nowhere.

#17460 registered `bash $HOME/instructions/tools/statusline.sh`, verified both ways: the command string read back from `~/.claude/settings.json` and run as the client runs it renders `[0] 164k claude agent-harness worker ship-change`, and pointing that registration at a missing path made `check-hook-wiring` report `registered-script-missing` and exit 1.

The interpreter form is guarded. The bare-path form nobody has written yet is not.
