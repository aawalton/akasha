import type { Check, CheckRun } from "../check/check-shape.ts";
export type Patch = {
    readonly root: string;
    readonly file: string;
    readonly goneElsewhere: readonly string[];
    readonly repointedElsewhere: ReadonlyMap<string, string>;
};
export declare function baseOf(patch: Patch, index: string): string;
export declare function changedBy(patch: Patch, index: string, base: string): readonly string[];
export declare function runGate(checks: readonly Check[], patch: Patch): readonly CheckRun[];
