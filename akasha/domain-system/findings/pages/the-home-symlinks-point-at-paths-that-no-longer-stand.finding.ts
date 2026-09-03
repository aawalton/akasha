import type { Finding } from "../finding.page-type.ts"

export const theHomeSymlinksPointAtPathsThatNoLongerStand = {
  id: "01a06866-fd54-7b04-a7e5-812556a2313d",
  pageTypeSlug: "finding",
  slug: "the-home-symlinks-point-at-paths-that-no-longer-stand",
  domainSlug: "domain/akasha-migration",
  claim:
    "Alan's home directory holds symlinks into the old dotfiles paths, and the files those name are gone, so each reads as present and follows to nothing until setup-symlinks.sh is run again.",
  evidence:
    "Before the move, readlink showed ~/.bashrc, ~/.profile, ~/.tmux.conf, ~/.gitconfig, ~/.ignore and ~/.config/git/ignore all pointing into /var/home/walton/repos/akasha/dotfiles. The twenty-seven files they name were taken away on a per-file match against successors inside akasha. link-making already reports a dangling link rather than passing over it, so a single run of akasha/machines/provisioning/scripts/setup-symlinks/setup-symlinks.shell-script.shell.sh both repairs them and names anything it cannot. That run is a live-system act and was left to whoever holds that permission.",
} as const satisfies Finding
