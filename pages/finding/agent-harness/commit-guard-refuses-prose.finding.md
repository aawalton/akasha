---
id: 4f081f05-af95-51f9-aeb3-e394b7e958b5
page-type-slug: finding
title: "Commit guard refuses prose"
domain-slug: domain/agent-harness
---

# Claim

`block-instructions-direct-commit.sh` refuses a Bash call whose command text merely quotes a git commit, because it parses prose the same way it parses a command.

# Evidence

Met on #17597 while composing its project document outside the instructions root with a heredoc. The document's own text named the probes the row would run — `git -C ~/memory commit -m x` and `cd ~/memory && git commit -m x`. The hook split the whole command on `&&`, found a segment beginning `git commit` with no `-C`, attributed it to the session cwd, and refused the write with "This one targets: /var/home/walton/instructions".

Nothing was being committed. The command was `cat > /tmp/17597/project.md <<'EOF'`, and the payload was a markdown body.

The refusal is loud and the work-around is immediate — compose the file with a tool that is not Bash — so the cost is one turn rather than a wrong outcome. What makes it worth recording is that the class is unbounded: any document describing what these guards refuse is a document the guards refuse, and the surfaces most likely to describe them are the ones this estate writes most.
