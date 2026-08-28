import { ORCHESTRATOR_CACHE_REPO_PATH } from "@infra/k8s-types/orchestrator-cache-locations"
import { transportRepo } from "../src/repos"

const CODE_BARE_REPO_PATH = transportRepo("code").bareRepoPath
const INSTRUCTIONS_BARE_REPO_PATH = transportRepo("instructions").bareRepoPath
const BOOKS_BARE_REPO_PATH = transportRepo("books").bareRepoPath
const MEMORY_BARE_REPO_PATH = transportRepo("memory").bareRepoPath
const STORIES_BARE_REPO_PATH = transportRepo("stories").bareRepoPath
const CODE_EDITOR_BARE_REPO_PATH = transportRepo("code-editor").bareRepoPath
const AKASHA_BARE_REPO_PATH = transportRepo("akasha").bareRepoPath
const HOOKS_SOURCE_DIR = `${ORCHESTRATOR_CACHE_REPO_PATH}/infra/git-transport/hooks`

const CODE_MIRROR_URL = transportRepo("code").mirrorUrl
const INSTRUCTIONS_MIRROR_URL = transportRepo("instructions").mirrorUrl
const BOOKS_MIRROR_URL = transportRepo("books").mirrorUrl
const MEMORY_MIRROR_URL = transportRepo("memory").mirrorUrl
const STORIES_MIRROR_URL = transportRepo("stories").mirrorUrl
const CODE_EDITOR_MIRROR_URL = transportRepo("code-editor").mirrorUrl
const AKASHA_MIRROR_URL = transportRepo("akasha").mirrorUrl

const CREDENTIAL_HELPER = `'!f() { echo username=x-access-token; echo "password=$GITHUB_ACCESS_TOKEN"; }; f'`

export const INIT_BARE_REPO_SCRIPT = `set -e
CODE_REPO=${CODE_BARE_REPO_PATH}
INSTRUCTIONS_REPO=${INSTRUCTIONS_BARE_REPO_PATH}
BOOKS_REPO=${BOOKS_BARE_REPO_PATH}
MEMORY_REPO=${MEMORY_BARE_REPO_PATH}
STORIES_REPO=${STORIES_BARE_REPO_PATH}
CODE_EDITOR_REPO=${CODE_EDITOR_BARE_REPO_PATH}
AKASHA_REPO=${AKASHA_BARE_REPO_PATH}
CREDENTIAL_HELPER=${CREDENTIAL_HELPER}
LOCK=/data/git/repositories/.init-lock
mkdir -p /data/git/repositories
touch "$LOCK"
(
  attempts=0
  until flock -n 9; do
    attempts=$((attempts+1))
    if [ "$attempts" -ge 60 ]; then
      echo "init-bare-repo: timed out waiting for lock after \${attempts}s" >&2
      exit 1
    fi
    sleep 1
  done

  # Cold-start: if the SSD bare repo is missing or unreadable, clone from
  # the GitHub mirror. The probe is \`git rev-parse HEAD\` so a partial
  # failed clone (skeleton .git/ with empty objects/) is detected and
  # re-cloned fresh.
  if git -C "$CODE_REPO" rev-parse HEAD >/dev/null 2>&1; then
    echo "init-bare-repo: $CODE_REPO already present, skipping clone"
  else
    if [ -e "$CODE_REPO" ]; then
      echo "init-bare-repo: $CODE_REPO exists but HEAD unreadable — wiping partial state"
      rm -rf "$CODE_REPO"
    fi
    if [ -z "$GITHUB_ACCESS_TOKEN" ]; then
      echo "init-bare-repo: SSD store empty and no GitHub credential set" >&2
      exit 1
    fi
    mkdir -p /data/git/repositories/alan
    echo "init-bare-repo: cold-cloning bare repo from GitHub mirror"
    GIT_TERMINAL_PROMPT=0 git -c "credential.helper=$CREDENTIAL_HELPER" clone --bare ${CODE_MIRROR_URL} "$CODE_REPO"
    echo "init-bare-repo: clone complete"
  fi

  git config -f "$CODE_REPO/config" uploadpack.allowReachableSHA1InWant true

  # Hooks as symlinks into the source cache. \`ln -sfn\` is the atomic
  # overwrite form for symlinks; works whether or not a previous file
  # exists at the destination. The source-cache /app/repo is populated by
  # the next init container — these symlink targets are unresolved until
  # then, which is fine because hooks fire only after both inits complete.
  #
  # DECLARED: the code repo mirrors to the code destination, under the
  # project-branch policy.
  #
  # Both halves are named here rather than inherited. \`post-receive\` runs
  # \`git push --all --force --prune\` at whatever destination it resolves, so a
  # repo pushing to a destination that is not its own empties the other repo's
  # mirror with no undo. It resolves that destination from \`mirror.url\` in the
  # config of the repo that fired it — written on the line below — and nothing
  # in the hook's environment names a destination at all, so the wrong-repo
  # push is unrepresentable rather than merely avoided.
  #
  # The pairing is the invariant: a repo carries \`post-receive\` if and only if
  # it declares a \`mirror.url\`. A destination with no hook does nothing, but a
  # hook with no destination is a repo whose mirror silently never runs, and
  # k8s/synth.unit.test.ts asserts both directions because only the second one
  # is dangerous.
  #
  # \`pre-receive\` is the same choice in the policy register. The project-NNNN
  # naming and main-reachability policy is right for a repo fed by CI and wrong
  # for one whose only branch is main. While the consolidation to akasha runs,
  # \`ops branch\` is off for every repo outside it, so no change branch can be
  # minted here and main is the only branch there is — which is the second case,
  # not the first. This repo therefore takes the append-only policy the others
  # take, and goes back to the strict one when branches come back.
  git config -f "$CODE_REPO/config" mirror.url ${CODE_MIRROR_URL}
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$CODE_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$CODE_REPO/hooks/post-receive"
  for f in update proc-receive; do
    printf '#!/bin/sh\\nexit 0\\n' > "$CODE_REPO/hooks/$f"
    chmod +x "$CODE_REPO/hooks/$f"
  done
  echo "init-bare-repo: code repo hooks and mirror destination refreshed"

  # The instructions repo — the second copy of the agent instruction tree,
  # whose first copy is a single btrfs subvolume on one workstation disk.
  # Runs last, so the code repo is fully prepared before anything new can
  # fail, and created empty rather than cloned from its own mirror: the
  # workstation is this tree's authority, the mirror below is downstream of
  # this store rather than upstream of it, and seeding a store from a copy of
  # itself would make the two indistinguishable when they disagree. Restoring
  # this store from that mirror is a separate leg and is deliberately not
  # wired here.
  #
  # The probe must succeed on a repo with zero commits — that is this repo's
  # normal state between creation and the seed push — so it asks whether a git
  # directory is there, not whether a commit is. Nothing in this script removes
  # this repo under any condition: it holds the only second copy of the tree,
  # it has no upstream to re-clone from, and a store must never be wiped by the
  # thing that created it. "Present ⇒ leave untouched" is also what makes
  # idempotence legible in the init log rather than merely true.
  #
  # A failure here is fatal, like every other step under \`set -e\`. A second
  # copy that goes missing quietly is discovered only when it is needed.
  if git -C "$INSTRUCTIONS_REPO" rev-parse --git-dir >/dev/null 2>&1; then
    echo "init-bare-repo: $INSTRUCTIONS_REPO already present, leaving untouched"
  else
    echo "init-bare-repo: creating empty bare repo $INSTRUCTIONS_REPO"
    git init --bare --initial-branch=main "$INSTRUCTIONS_REPO"
  fi

  # DECLARED: the instructions repo mirrors to its own destination, under the
  # append-only policy. Both lines run on the already-present path too, since a
  # destination and a policy are reconciled state rather than creation-time
  # state — a repo that survived a pod restart must come back bound the same
  # way.
  #
  # The policy differs from the code repo's because the repos differ in kind.
  # This one exists to BE a second copy, so its whole value is that it does not
  # go backwards: \`post-receive\` mirrors with --force --prune, meaning the
  # off-cluster copy reproduces a rewind as faithfully as a commit, and this
  # repo is the last point in the chain where one can still be refused. Its
  # policy therefore refuses a non-fast-forward and a deletion of main, and
  # permits creation — because a restore pushes into an empty repo, and a guard
  # that refused creation would be aimed at the recovery path it exists to
  # protect. That trade is available because restore READS and replication
  # WRITES: a clone is the only operation a restore needs, so the two legs use
  # disjoint operations and the write policy can be arbitrarily strict without
  # holding recovery hostage.
  git config -f "$INSTRUCTIONS_REPO/config" mirror.url ${INSTRUCTIONS_MIRROR_URL}
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$INSTRUCTIONS_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$INSTRUCTIONS_REPO/hooks/post-receive"
  echo "init-bare-repo: instructions repo hooks and mirror destination refreshed"

  # The remaining three — books (Alan's non-fiction), memory (what the fleet
  # produced and nobody is bound by) and stories (his fiction). Each takes the
  # instructions repo's treatment above unchanged and for its reasons: created
  # empty rather than cloned from its own mirror, removed by nothing here, and
  # bound to its own destination under the append-only policy, because each is a
  # second copy whose authority is a workstation tree and whose only branch is
  # main. Every line below reconciles rather than creates, so it runs on the
  # already-present path too. Restore stays unwired for all three.
  #
  # They differ only in what their destinations held when first declared.
  # \`aawalton/books\` and \`aawalton/memory\` were populated by hand beforehand, so
  # their first push replicated onto a copy that already matched.
  # \`aawalton/stories\` holds GitHub's placeholder README and nothing else, so its
  # first push is the seed: /home/walton/stories was not a git repository at all
  # until this repo existed, and its files enter as one initial commit that the
  # force-mirror then writes over the placeholder.
  if git -C "$BOOKS_REPO" rev-parse --git-dir >/dev/null 2>&1; then
    echo "init-bare-repo: $BOOKS_REPO already present, leaving untouched"
  else
    echo "init-bare-repo: creating empty bare repo $BOOKS_REPO"
    git init --bare --initial-branch=main "$BOOKS_REPO"
  fi
  git config -f "$BOOKS_REPO/config" mirror.url ${BOOKS_MIRROR_URL}
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$BOOKS_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$BOOKS_REPO/hooks/post-receive"
  echo "init-bare-repo: books repo hooks and mirror destination refreshed"

  if git -C "$MEMORY_REPO" rev-parse --git-dir >/dev/null 2>&1; then
    echo "init-bare-repo: $MEMORY_REPO already present, leaving untouched"
  else
    echo "init-bare-repo: creating empty bare repo $MEMORY_REPO"
    git init --bare --initial-branch=main "$MEMORY_REPO"
  fi
  git config -f "$MEMORY_REPO/config" mirror.url ${MEMORY_MIRROR_URL}
  # The memory repo's own history carries objects GitHub will not take, so its
  # mirror is a lineage rooted at the destination rather than this repo's past.
  git config -f "$MEMORY_REPO/config" mirror.mode snapshot
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$MEMORY_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$MEMORY_REPO/hooks/post-receive"
  echo "init-bare-repo: memory repo hooks and mirror destination refreshed"

  if git -C "$STORIES_REPO" rev-parse --git-dir >/dev/null 2>&1; then
    echo "init-bare-repo: $STORIES_REPO already present, leaving untouched"
  else
    echo "init-bare-repo: creating empty bare repo $STORIES_REPO"
    git init --bare --initial-branch=main "$STORIES_REPO"
  fi
  git config -f "$STORIES_REPO/config" mirror.url ${STORIES_MIRROR_URL}
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$STORIES_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$STORIES_REPO/hooks/post-receive"
  echo "init-bare-repo: stories repo hooks and mirror destination refreshed"

  # Alan's cut of VS Code, which is the editor he works in. It takes the
  # treatment above unchanged: created empty rather than cloned, removed by
  # nothing here, and bound to its own destination under the append-only policy,
  # because its authority is a workstation tree and its only branch is main.
  #
  # It differs from the other four in what depends on it rather than in how it
  # is held. Two further checkouts stand beside that workstation tree — the
  # staging tree a promotion builds and drives, and the live tree Alan runs —
  # and both take the working checkout as their origin rather than this store.
  # That is the three-tree split working: what he runs advances only through
  # \`tools/promote.sh\`, so this repo is the second copy of the source and never
  # a route to his editor.
  if git -C "$CODE_EDITOR_REPO" rev-parse --git-dir >/dev/null 2>&1; then
    echo "init-bare-repo: $CODE_EDITOR_REPO already present, leaving untouched"
  else
    echo "init-bare-repo: creating empty bare repo $CODE_EDITOR_REPO"
    git init --bare --initial-branch=main "$CODE_EDITOR_REPO"
  fi
  git config -f "$CODE_EDITOR_REPO/config" mirror.url ${CODE_EDITOR_MIRROR_URL}
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$CODE_EDITOR_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$CODE_EDITOR_REPO/hooks/post-receive"
  echo "init-bare-repo: code-editor repo hooks and mirror destination refreshed"


  # Akasha takes the workstation-authority treatment above unchanged.
  if git -C "$AKASHA_REPO" rev-parse --git-dir >/dev/null 2>&1; then
    echo "init-bare-repo: $AKASHA_REPO already present, leaving untouched"
  else
    echo "init-bare-repo: creating empty bare repo $AKASHA_REPO"
    git init --bare --initial-branch=main "$AKASHA_REPO"
  fi
  git config -f "$AKASHA_REPO/config" mirror.url ${AKASHA_MIRROR_URL}
  ln -sfn ${HOOKS_SOURCE_DIR}/pre-receive-main-append-only "$AKASHA_REPO/hooks/pre-receive"
  ln -sfn ${HOOKS_SOURCE_DIR}/post-receive "$AKASHA_REPO/hooks/post-receive"
  echo "init-bare-repo: akasha repo hooks and mirror destination refreshed"
) 9>"$LOCK"
`
