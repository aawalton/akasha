---
id: 5984936a-ed12-54bf-8834-ed40ebf9325a
page-type-slug: finding
title: "The Spent Links act reads two ways that ask for different things"
domain-slug: domain/alan-email
---

# Claim

The Spent Links act "Archive a sign-in link fifteen minutes after it arrives" reads two ways that ask for different things. Read as an instruction to a triaging agent it cannot be obeyed, no agent waiting fifteen minutes. Read as a specification for whoever writes the rule it is exact: set `delay: 15m`. Its aid "Send him nothing — it files itself" is true only on the second reading; on the first an agent files it, not itself. `delay:` stands once in the whole corpus, on `anthropic-login-links.md`.

# Evidence

Read off the `review-instructions` reading of `domains/alan-email.md` finished 2026-08-21, read line by line, bottom to top. The reading reports `grep -rn "^delay:" email/` returning one line, `anthropic-login-links.md`, `delay: 15m`.

The reading left the line standing rather than rewriting it, because the two readings ask for different things and only Alan settles which he meant.

Not measured here: I did not run the grep myself, did not open `anthropic-login-links.md`, and did not look for other acts in the corpus written with the same tense. Whether any triaging agent has in fact tried to obey the first reading is unread.
