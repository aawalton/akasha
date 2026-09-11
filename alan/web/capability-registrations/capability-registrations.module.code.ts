import "akasha/alan/web/display-registrations/display-registrations.module.code.ts"
import "akasha/alan/web/idle-cover-click/idle-cover-click.module.code.ts"
import "akasha/alan/web/idle-train-verb/idle-train-verb.module.code.ts"
import "akasha/alan/web/idle-train10-verb/idle-train10-verb.module.code.ts"
import "akasha/alan/web/idle-trainmax-verb/idle-trainmax-verb.module.code.ts"
import "akasha/alan/web/idle-remove-verb/idle-remove-verb.module.code.ts"
import "akasha/alan/web/idle-lock-verb/idle-lock-verb.module.code.ts"
import "akasha/alan/web/idle-reorder-verb/idle-reorder-verb.module.code.ts"
import "akasha/alan/web/declared-effects/declared-effects.module.code.ts"

import { ROSTER_GALLERY_CAPABILITY } from "akasha/alan/web/idle-card-page-type/idle-card-page-type.module.code.ts"
import { RevealHost } from "akasha/alan/web/reveal-host/reveal-host.module.code.tsx"
import { RosterGalleryHost } from "akasha/alan/web/roster-gallery/roster-gallery.module.code.tsx"
import { registerCapabilityHost } from "akasha/pages/ui/capabilities/capability-hosts/capability-hosts.module.code.tsx"

registerCapabilityHost(ROSTER_GALLERY_CAPABILITY, RosterGalleryHost)
registerCapabilityHost("reveal", RevealHost)
