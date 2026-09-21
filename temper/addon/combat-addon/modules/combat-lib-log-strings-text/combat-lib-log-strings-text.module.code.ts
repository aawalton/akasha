export const STRING_CRITICAL = "critically "
export const STRING_YOU = "You"
export const STRING_GAINED = "gained"
export const STRING_NOGAINED = "gained no"
export const STRING_LOST = "lost"

export const STRING_UNITTYPE_PLAYER = "yourself"
export const STRING_UNITTYPE_PET = "your pet"
export const STRING_UNITTYPE_GROUP = "a group member"
export const STRING_UNITTYPE_OTHER = "another player"

export const STRING_IS_AT = "is at"
export const STRING_INCREASED = "increased to"
export const STRING_DECREASED = "decreased to"

export const STRING_ULTIMATE = "Ultimate"

export const STRING_STAT_SPELL_CRIT_DONE = "Spell Critical Damage"
export const STRING_STAT_WEAPON_CRIT_DONE = "Physical Critical Damage"
export const STRING_STAT_STATUS_EFFECT_CHANCE = "Status Effect Chance"

export const STRING_MESSAGE_BAR = "Bar"

export const STRING_FORMAT_TARGET_NORMAL = "<<1>>|r with "
export const STRING_FORMAT_TARGET_BLOCK = "<<1>>s block|r with"
export const STRING_FORMAT_TARGETSELF_NORMAL = "you|r with "
export const STRING_FORMAT_TARGETSELF_SELF = "yourself|r with "
export const STRING_FORMAT_TARGETSELF_BLOCK = "your block|r with"

export const STRING_FORMAT_ABSORBED = "<<1>> (Absorbed: <<2>>)"
export const STRING_FORMAT_HEALABSORB = "<<1>> |cffffffYour|r <<2>> absorbs |cffffff<<3>>|r damage."

export const STRING_FORMATSTRING_SKILLDELAY = " (Delay: |cffffff<<1>>|r ms)"

const LOG_FORMAT_STRINGS: Record<number, string> = {
  [4]: "<<1>> |cffffffYou|r <<2>>hit |cffdddd<<3>> <<4>> for |cffffff<<5>>.",
  [5]: "<<1>> |cffdddd<<2>>|r <<3>>hits |cffffff<<4>> <<5>> for |cffffff<<6>>.",
  [6]: "<<1>> |cffffffYou|r <<2>>hit |cffffff<<3>> <<4>> for |cffffff<<5>>.",
  [7]: "<<1>> |cffffffYou|r <<2>>heal |cddffdd<<3>>|r with <<4>> for |cffffff<<5>>.",
  [8]: "<<1>> |cddffdd<<2>>|r <<3>>heals |cffffffyou|r with <<4>> for |cffffff<<5>>.",
  [9]: "<<1>> |cffffffYou|r <<2>>heal |cffffffyourself|r with <<3>> for |cffffff<<4>>.",
  [10]: "<<1>> |cffffff<<2>>|r <<3>> <<4>><<5>>.",
  [11]: "<<1>> |cffffff<<2>>|r <<3>> <<4>><<5>>.",
  [12]: "<<1>> |cffffff<<2>>|r <<3>> <<4>><<5>>.",
  [13]: "<<1>> |cffffff<<2>>|r <<3>> <<4>><<5>>.",
  [14]: "<<1>> Your <<2>> <<3>> |cffffff<<4>>|r<<5>>.",
  [15]: "<<1>> |cffffffYou|r <<2>> <<3>> <<4>> <<5>>.",
  [20]: "<<1>> <<2>>: <<3>>% HP. (<<4>>/<<5>>)",
  [21]: "<<1>> FPS: <<2>> (<<3>> - <<4>>), Ping: <<5>> ms",
}

export function getLogFormatString(logtype: number): string {
  return LOG_FORMAT_STRINGS[logtype] ?? ""
}

const SKILLS_FORMAT_STRINGS: Record<number, string> = {
  [1]: "<<1>> You cast <<2>><<3>>.",
  [2]: "<<1>> You start to cast <<2>><<3>>.",
  [3]: "<<1>> You start to channel <<2>><<3>>.",
  [4]: "<<1>> You finished casting <<2>>.",
  [5]: "<<1>> Your cast of <<2>> was registered.",
  [6]: "<<1>> Your cast of <<2>> was activated from queue.",
}

export function getSkillsFormatString(status: number): string {
  return SKILLS_FORMAT_STRINGS[status] ?? ""
}

const DEATH_FORMAT_STRINGS: Record<number, string> = {
  [1]: "<<1>> |cffffff<<2>>|r |cff3333died|r.<<4>>",
  [2]: "<<1>> |cffffff<<2>>|r |c00cc00ressurected|r.",
  [3]: "<<1>> <<2>> <<3>> <<4>>.",
  [4]: "<<1>> <<2>> <<3>> <<4>>.",
}

export function getDeathFormatString(state: number): string {
  return DEATH_FORMAT_STRINGS[state] ?? ""
}

const MESSAGE_STRINGS: Record<number, string> = {
  [1]: "Entering Combat",
  [2]: "Exiting Combat",
  [3]: "Weapon Swap",
}

export function getMessageString(message: number): string {
  return MESSAGE_STRINGS[message] ?? ""
}

const RESURRECT_STRINGS: Record<number, string> = {
  [1]: "|c00cc00resurrect|r",
  [2]: "|c00cc00resurrects|r",
}

export function getResurrectString(index: number): string {
  return RESURRECT_STRINGS[index] ?? ""
}
