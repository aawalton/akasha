---
id: 89a3d397-7195-5ca2-b84a-395af4c05264
slug: html-only-body-dropped
page-type-slug: finding
title: "Html only body dropped"
domain-slug: domain/email
---

# Claim

ops email messages get decodes text/plain only, so an HTML-only email returns an empty body with no error, and no path exists to read its content or export it as raw rfc822 bytes.

# Evidence

Surfaced by Amy, 2026-07-25, during live triage of an App Store Connect build-rejection notice (build 157, astra's #15906/#15815 incident); hit twice in one incident.

Gap: `ops email messages get` decodes text/plain only. For an HTML-only email (common for vendor/transactional mail -- Apple, banks, most senders) it returns an empty body, silently. `ops email attachments list` returns [] because the HTML body is a MIME part, not an attachment. No path exists to read an HTML-only email's content, and no raw/rfc822 export path either.

Why it matters: this is a silent-empty, not an error -- the verb reports success with an empty body, so a caller cannot distinguish "no body" from "HTML body dropped." During the incident the rejection reason was unreadable; the fallback was probing Gmail's full-text index, which only tests guessable phrases. It also made a forward-to-another-agent offer undeliverable, since the forward would carry an empty body.

Fix proposed, two parts, read-only: (1) messages get -- fall back to text/html plus a de-HTML'd rendering when no text/plain exists; never return an empty body while an HTML part exists, say so if dropped; (2) add a raw path -- expose existing getRawMessage (already in @alanwalton/email-google, unexposed by any verb) as `ops email messages raw --message <id>`, emitting rfc822 bytes.

Acceptance proposed: on the known HTML-only Apple "Action needed" notice (id 19f99248010ae891), messages get returns a non-empty body with the real text; messages raw emits rfc822 bytes round-tripping to a parseable .eml with the same subject; include a mixed multipart case confirming plain-text is still preferred.

Related: pairs with #15779 (--attach, in CI now) -- raw export plus attach would make "forward this vendor mail intact" possible. Owner amy (email domain / executive-assistant tooling). Backlog; dispatch a headless /p worker when picked up. Project #16110, someday_maybe, deploy, domain email.
