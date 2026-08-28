import "~/lib/display-registrations"
import "~/idle/lib/idle-cover-click"
import "~/idle/lib/idle-train-verb"
import "~/idle/lib/idle-train10-verb"
import "~/idle/lib/idle-trainmax-verb"
import "~/idle/lib/idle-remove-verb"
import "~/idle/lib/idle-lock-verb"
import "~/idle/lib/idle-reorder-verb"
import "~/action-verbs/declared-effects"

import { registerCapabilityHost } from "@shared/pages-ui/capabilities/capability-hosts"
import { RevealHost } from "~/idle/components/reveal-host"
import { RosterGalleryHost } from "~/idle/components/roster-gallery"
import { ROSTER_GALLERY_CAPABILITY } from "~/idle/lib/idle-card-page-type"

registerCapabilityHost(ROSTER_GALLERY_CAPABILITY, RosterGalleryHost)
registerCapabilityHost("reveal", RevealHost)
