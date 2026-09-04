import "../display-registrations/display-registrations.module.code.ts"
import "../idle-cover-click/idle-cover-click.module.code.ts"
import "../idle-train-verb/idle-train-verb.module.code.ts"
import "../idle-train10-verb/idle-train10-verb.module.code.ts"
import "../idle-trainmax-verb/idle-trainmax-verb.module.code.ts"
import "../idle-remove-verb/idle-remove-verb.module.code.ts"
import "../idle-lock-verb/idle-lock-verb.module.code.ts"
import "../idle-reorder-verb/idle-reorder-verb.module.code.ts"
import "../declared-effects/declared-effects.module.code.ts"

import { registerCapabilityHost } from "@akasha/pages-ui/capabilities/capability-hosts"
import { ROSTER_GALLERY_CAPABILITY } from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { RevealHost } from "../reveal-host/reveal-host.module.code.tsx"
import { RosterGalleryHost } from "../roster-gallery/roster-gallery.module.code.tsx"

registerCapabilityHost(ROSTER_GALLERY_CAPABILITY, RosterGalleryHost)
registerCapabilityHost("reveal", RevealHost)
